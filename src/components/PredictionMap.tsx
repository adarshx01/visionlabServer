'use client';
import { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const PredictionMaps = ({ crimeData }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [safeRoute, setSafeRoute] = useState(null);
  const [userMarker, setUserMarker] = useState(null);

  const [userParams, setUserParams] = useState({
    time_of_day: 2,
    has_vehicle: 1,
    num_people_accompanying: 0,
  });
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places', 'visualization'],
      });

      const google = await loader.load();
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 10.028485, lng: 76.310016 }, // Centered on the first crime data point
        zoom: 8,
      });

      setMap(mapInstance);
      setDirectionsService(new google.maps.DirectionsService());
      setDirectionsRenderer(new google.maps.DirectionsRenderer({ map: mapInstance }));

      // Initialize user marker
      const userMarkerInstance = new google.maps.Marker({
        map: mapInstance,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#4285F4',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        },
      });
      setUserMarker(userMarkerInstance);

      // Add markers for crime data
      crimeData.features.forEach(feature => {
        const [lng, lat] = feature.geometry.coordinates;
        new google.maps.Marker({
          position: { lat, lng },
          map: mapInstance,
          title: `Crime ID: ${feature.properties.id}`,
        });
      });
    };

    initMap();
  }, [crimeData]);

  
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const findNearestCrimeData = (lat, lng) => {
    let nearestCrime = null;
    let minDistance = 1.5;

    for (let feature of crimeData.features) {
      const [crimeLng, crimeLat] = feature.geometry.coordinates;
      const distance = calculateDistance(lat, lng, crimeLat, crimeLng);

      if (distance > minDistance) {
        minDistance = distance;
        nearestCrime = feature;
      }
    }

    return { nearestCrime, distance: minDistance };
  };

const fetchSafeRoadPrediction = async (params) => {
    try {
      const response = await fetch('https://testmapmlapi.onrender.com/predict_safety', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.SafeRoad;
    } catch (error) {
      console.error('Failed to fetch SafeRoad prediction:', error);
      return null;
    }
  };

  const calculateSafeRoute = async () => {
    if (!directionsService || !directionsRenderer) return;

    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    try {
      const result = await new Promise((resolve, reject) => {
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              resolve(result);
            } else {
              reject(new Error(`Directions request failed: ${status}`));
            }
          }
        );
      });

      const routes = result.routes;
      let safestRoute = null;
      let highestSafetyScore = -Infinity;

      for (let route of routes) {
        let routeSafetyScore = 0;
        let totalSegments = 0;

        for (let leg of route.legs) {
          for (let step of leg.steps) {
            const startLat = step.start_location.lat();
            const startLng = step.start_location.lng();
            const endLat = step.end_location.lat();
            const endLng = step.end_location.lng();

            const { nearestCrime, distance } = findNearestCrimeData(
              (startLat + endLat) / 2,
              (startLng + endLng) / 2
            );

            let segmentSafetyScore;
            if (nearestCrime && distance < 1) {
              const predictionParams = {
                Magnitude: nearestCrime.properties.mag || 0,
                Crime_Types: nearestCrime.properties.crime ? nearestCrime.properties.crime.length : 0,
                time_of_day: userParams.time_of_day,
                shops_nearby: nearestCrime.properties.shops_nearby || 0,
                area_type: 1,
                has_Vehicle: userParams.has_vehicle,
                crime_rate: nearestCrime.properties.CrimeRate || 0,
                number_crime_last_Three_months: nearestCrime.properties.reported_incidents || 0,
                number_people_accompanying: userParams.num_people_accompanying,
                weather_condition: 1,
                proximity_police_station: nearestCrime.properties.proximity_police_station || 10,
                proximity_hospital: 8,
                streetlight: nearestCrime.properties.lighting_at_Night === "yes" ? 1 : 0,
                traffic_density: nearestCrime.properties.traffic_density === "high" ? 3 : (nearestCrime.properties.traffic_density === "medium" ? 2 : 1),
                reported_crimes: nearestCrime.properties.reported_incidents || 0,
                proximity_public_transport: nearestCrime.properties.proximity_public_transport || 7,
              };

              segmentSafetyScore = await fetchSafeRoadPrediction(predictionParams);
            } else {
              segmentSafetyScore = 100; // Consider it safe if no crime data nearby
            }

            routeSafetyScore += segmentSafetyScore;
            totalSegments++;
          }
        }

        const averageRouteSafetyScore = routeSafetyScore / totalSegments;
        if (averageRouteSafetyScore > highestSafetyScore) {
          highestSafetyScore = averageRouteSafetyScore;
          safestRoute = route;
        }
      }

      if (safestRoute) {
        directionsRenderer.setDirections({ routes: [safestRoute] });
        setSafeRoute(safestRoute);
        console.log('Safest route calculated and displayed');
      } else {
        console.error('No safe route found');
      }

    } catch (error) {
      console.error('Error in calculateSafeRoute:', error);
    }
  };

  const handleUserParamChange = (e) => {
    const { name, value } = e.target;
    setUserParams(prevParams => ({
      ...prevParams,
      [name]: parseInt(value, 10),
    }));
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input id="origin" type="text" placeholder="Origin" />
        <input id="destination" type="text" placeholder="Destination" />
        <button onClick={calculateSafeRoute}>Calculate Safe Route</button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Time of day:
          <select name="time_of_day" value={userParams.time_of_day} onChange={handleUserParamChange}>
            <option value={1}>Day</option>
            <option value={2}>Night</option>
          </select>
        </label>
        <label>
          Has vehicle:
          <select name="has_vehicle" value={userParams.has_vehicle} onChange={handleUserParamChange}>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </label>
        <label>
          Number of people accompanying:
          <input
            type="number"
            name="num_people_accompanying"
            value={userParams.num_people_accompanying}
            onChange={handleUserParamChange}
            min="0"
          />
        </label>
      </div>
      <div ref={mapRef} style={{ height: '630px', width: '100%' }} />
    </div>
  );
};

export default PredictionMaps;