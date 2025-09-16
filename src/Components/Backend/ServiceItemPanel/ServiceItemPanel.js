import { TextareaControl, TextControl } from '@wordpress/components';
import { updateData } from '../../../../../bpl-tools/utils/functions';
import { IconLibrary } from '../../../../../bpl-tools/Components';

const ServiceItemPanel = ({ attributes, setAttributes, index }) => {

    const { serviceData = [] } = attributes || {};

    const { title, description, icon } = serviceData[index];

    return (
        <>
            <IconLibrary
                label='Card Icon'
                value={icon}
                onChange={(v) => setAttributes({
                    serviceData: updateData(serviceData, v, index, 'icon')
                })}
            />
            <TextControl
                label='Card Title'
                value={title}
                onChange={(v) => setAttributes({
                    serviceData: updateData(serviceData, v, index, 'title')
                })}
            />
            <TextareaControl
                label='Card SubTitle'
                value={description}
                onChange={(v) => setAttributes({
                    serviceData: updateData(serviceData, v, index, 'description')
                })}
            />
        </>
    );
};

export default ServiceItemPanel;