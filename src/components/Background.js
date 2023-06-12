import btmLeftShape from "../svg/btm-left-shape.svg"
import topRightShape from "../svg/top-right-shape.svg"

const Background = () => {
    return(
        <section>
            <img src={topRightShape} alt="Shape" className="absolute right-0"></img>
            <img src={btmLeftShape} alt="Shape" className="absolute bottom-0"></img>
        </section>
    )
}

export default Background