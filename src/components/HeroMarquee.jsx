import '../styles/hero-marquee.css'
import {useEffect, useLayoutEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {useItems} from "../api/itemsAPI";
const HeroMarquee = () => {
    const marqueeRef = useRef(null);
    const { data, isLoading, error } = useItems(1, 20);
    useEffect(() => {
        let items;
        if (marqueeRef.current) {
            items = marqueeRef.current.querySelectorAll('.hero-marquee-item');
        }
        if (items) {
            items.forEach(item => {
                const delay = Math.random();
                item.classList.add('lazyloaded');
                item.style.setProperty('--reveal-delay', `${delay}s`);
            });
        }
    }, [data, isLoading]);
    if (isLoading) {
        return (<div>Loading ...</div>);
    }
    if (error) {
        return (<div>error loading items</div>);
    }
    return (
        <>
        <div className={'hero-marquee'} style={{ "--card-count": 10 }} ref={marqueeRef}>
            <div className={'hero-marquee__track'}>
                <div className={'hero-marquee__grid'}>
                    {
                        data?.items?.length && data.items.map((item, index) => (
                            <Link to={`/products/${item.id}`} className={'hero-marquee-item'}  key={`hero-${index}`}
                            >
                                <div className={'hero-marquee-item__media'}>
                                    <img key={index} src={(item?.media?.path)? `${process.env.REACT_APP_BACKEND_URL}${item.media.path}` : `https://picsum.photos/1000/1000?random=${index}`} alt={`Image ${index + 1}`} />

                                </div>
                            </Link>
                        ))}

                </div>
            </div>

        </div>
        </>
    )
}

export default HeroMarquee;
