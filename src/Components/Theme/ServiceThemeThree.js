
export default function ServiceThemeThree({ attributes, setAttributes }) {
    const { serviceData = [], Styles = {} } = attributes;
    const { cardBody } = Styles;
    const { icon, title, description } = cardBody;

    return (
        <div className='serviceContainer serviceThemeThree'>
            <div className="card-grid">
                {
                    serviceData?.length > 0 && serviceData.map((item, index) => {
                        return (
                            <div key={index} className="card-vertical" onClick={() => setAttributes({ activeIndex: index })}>
                                <div className="diagonal-bg"></div>
                                {
                                    icon?.show === false &&
                                    <div className="icon-wrapper">
                                        <span
                                            className="icon"
                                            dangerouslySetInnerHTML={{ __html: item?.icon }}
                                        />
                                    </div>
                                }

                                <div className="content-area">
                                    {
                                        cardBody?.line === false && <div className="accent-line"></div>
                                    }
                                    {
                                        title?.show === false &&
                                        <h3 className="card-title">{item?.title}</h3>
                                    }
                                    {
                                        description?.show === false &&
                                        <p className="card-description">{item?.description}</p>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
