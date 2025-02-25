export function SkillsList() {
  const skills = [
    {
      language: "Java",
      solved: 5,
      level: "Advanced",
    },
  ]

  return (
    <div className="space-y-4">
      {skills.map((skill, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">{skill.language}</span>
            <span className="text-sm text-muted-foreground">{skill.solved} problems solved</span>
          </div>
          <div className="text-sm text-muted-foreground">{skill.level}</div>
        </div>
      ))}
    </div>
  )
}

