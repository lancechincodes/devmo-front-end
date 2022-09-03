// animation for logo
export const logoVariants = {
    hidden: {
        opacity: 0
    },
    beginning: {
        opacity: [0, 1, 1],
        scale:  [1, 1, .4],
        transition: {
            duration: 2,
            ease: "easeInOut",
            delay: 1
        },
    },
    end: {
        opacity: 1,
        scale: .4,
        x: '25vw',
        transition: {
            x: {duration: 1},
            type: "spring",
            stiffness: 75
        }
    },
    leave: {
        opacity: 0
    }
}