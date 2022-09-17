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

// Fade in/out animation
export const fadeVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delay: .2,
      duration: 1,
      staggerChildren: 1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: .7
    }
  }
}