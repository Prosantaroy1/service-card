
export default function ServiceThemeOne({ attributes, setAttributes }) {

    const { serviceData = [], Styles = {} } = attributes;
    const { cardBody } = Styles;
    const { icon, title, description } = cardBody;


    return (
        <div className='serviceContainer serviceThemeOne'>
            <div className="card-grid">
                {
                    serviceData?.length > 0 && serviceData.map((item, index) => {
                        return (
                            <div key={index} className="card-vertical" onClick={() => setAttributes({ activeIndex: index })}>
                                {
                                    icon?.show === false &&
                                    <div className="icon-wrapper">
                                        <span
                                            className="icon"
                                            dangerouslySetInnerHTML={{ __html: item?.icon }}
                                        />
                                    </div>
                                }
                                {
                                    title?.show === false &&
                                    <h3 className="card-title">{item?.title}</h3>
                                }
                                {
                                    description?.show === false &&
                                    <p className="card-description">{item?.description}</p>
                                }
                                {
                                    icon?.position === true &&
                                    <div className="icon-wrapper">
                                        <span
                                            className="icon"
                                            dangerouslySetInnerHTML={{ __html: item?.icon }}
                                        />
                                    </div>
                                }


                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


