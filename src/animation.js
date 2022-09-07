// Logo animation
export const logoVariants = {
    hidden: {
        opacity: 0,
        pathLength: 0,
        fill: "rgba(38, 77, 228, 0)"
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        fill: "rgba(38, 77, 228, 1)"
    },
    exit: {
      opacity: 0,
      transition: {
        duration: .7
      }
    }
}

// Welcome animation
export const welcomeVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delay: .2,
      duration: .7
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: .7
    }
  }
}