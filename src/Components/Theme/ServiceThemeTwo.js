
export default function ServiceThemeTwo({ attributes }) {

    const { serviceData = [] } = attributes;

    return (
        <div className='serviceContainer serviceThemeTwo'>
            <div className="cards-grid">
                {
                    serviceData?.length > 0 && serviceData.map((item, idx) => {
                        return (
                            <div key={idx} className="card-horizontal">
                                <div className="icon-section">
                                    <p
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
