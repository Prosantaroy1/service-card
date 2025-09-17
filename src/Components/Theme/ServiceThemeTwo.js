
export default function ServiceThemeTwo({ attributes, setAttributes }) {

    const { serviceData = [] } = attributes;

    return (
        <div className='serviceContainer serviceThemeTwo'>
            <div className="cards-grid">
                {
                    serviceData?.length > 0 && serviceData.map((item, index) => {
                        return (
                            <div key={index} className="card-vertical" onClick={() => setAttributes({ activeIndex: index })}>
                                <div className="icon-wrapper">
                                    <span
                                        className="icon"
                                        dangerouslySetInnerHTML={{ __html: item?.icon }}
                                    />
                                </div>
                                <div className="content-section">
                                    <h3 className="card-title">{item?.title}</h3>
                                    <p className="card-description">{item?.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
