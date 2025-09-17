
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { TabPanel, } from '@wordpress/components';
import { tabController } from '../../../../../bpl-tools/utils/functions';
import { blocks, generalStyleTabs } from '../../../utils/options';
import General from './General/General';
import Style from './Style/Style';
import { BplBlockPreview } from '../../../../../bpl-tools/Components';

const Settings = ({ attributes, setAttributes, device, clientId }) => {

	const { theme } = attributes || {};

	return <>
		<InspectorControls>
			<div className='bBlocksInspectorInfo'>
				Need more block like this? Checkout the bundle ➡ <a href='https://wordpress.org/plugins/b-blocks' target='_blank' rel='noopener noreferrer'>B Blocks</a>
			</div>

			<TabPanel className='bPlTabPanel wp-block-b-blocks-test-purpose' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>
				{
					tab => <>
						{'general' === tab.name && <General attributes={attributes} device={device} setAttributes={setAttributes} />}

						{'style' === tab.name && <Style attributes={attributes} device={device} setAttributes={setAttributes} />}
					</>
				}
			</TabPanel>
		</InspectorControls>


		<BlockControls>
			<BplBlockPreview
				blocks={blocks}
				clientId={clientId}
				value={theme}
			/>
		</BlockControls>
	</>;
};
export default Settings;