export const techOptions = [
    { label: "JavaScript", value: "javascript" },
    { label: "React", value: "react" },
    { label: "Express.js", value: "express"},
    { label: "Node.js", value: "node.js"},
    { label: "Django", value: "django"},
    { label: "Python", value: "python"},
    { label: "C++", value: "c++"},
    { label: "Java", value: "java"},
];

export const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => label + ", ")
      : "Select Tech Stack...";
  };