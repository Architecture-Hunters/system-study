export default defineAppConfig({
  docus: {
    title: "study note",
    description: "The best place to start your documentation.",
    image:
      "https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png",
    aside: {
      level: 0,
      collapsed: true,
      exclude: [],
    },
    main: {
      padded: true,
      fluid: true,
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true,
    },
    github: {
      branch: "master",
      owner: "Architecture-Hunters",
      repo: "system-study",
      edit: true,
    },
  },
});
