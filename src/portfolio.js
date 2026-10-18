import data from "./content.json";

// Keep content edits in JSON; these helpers only prepare it for the UI.
const shown = (items = []) => items.filter((item) => item.visible !== false);
export const content = {
  ...data,
  projects: shown(data.projects),
  exp: shown(data.exp),
  edu: shown(data.edu),
  certs: shown(data.certs),
  skills: shown(data.skills),
};
export const fullName = [content.config.firstname, content.config.lastname]
  .filter(Boolean)
  .join(" ");
export const email = content.config["contact-email"];
export const profiles = {
  github: content.config.github,
  linkedin: content.config.linkedin,
  upwork: content.config.upwork,
  freelancer: content.config.freelancer,
  mostaqel: content.config.mostaqel,
  khamsat: content.config.khamsat,
};
export const projects = content.projects.map((project, index) => {
  const stack =
    project.stack ||
    (project.tech || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return {
    ...project,
    desc: project.id === "healthbridge" ? content.hb.lede : project.desc,
    number: String(index + 1).padStart(2, "0"),
    type: project.type || project.category,
    art: project.art || "generic",
    summary: project.summary || project.desc,
    tags: project.tags || stack.slice(0, 3),
    approach: project.approach || [],
    stack,
  };
});
export const categories = [
  "All systems",
  ...new Set(projects.map((p) => p.category)),
];
export const capabilities = data.capabilities;
export const heroModes = data.heroModes;
