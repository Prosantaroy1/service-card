
export default function ServiceThemeThree({ attributes }) {
    const { serviceData = [] } = attributes;

    return (
        <div className='serviceContainer serviceThemeThree'>
            <div className="cards-grid">
                {
                    serviceData?.length > 0 && serviceData.map((item, idx) => {
                        return (
                            <div key={idx} className="card-diagonal">
                                <div className="diagonal-bg"></div>
                                <div className="icon-wrapper">
                                    <p
                                        className="icon"
                                        dangerouslySetInnerHTML={{ __html: item?.icon }}
                                    />
                                </div>
                                <div className="content-area">
                                    <div className="accent-line"></div>
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
