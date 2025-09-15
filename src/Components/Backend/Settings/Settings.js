
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { TabPanel, Toolbar } from '@wordpress/components';
import { tabController } from '../../../../../bpl-tools/utils/functions';
import { generalStyleTabs } from '../../../utils/options';
import General from './General/General';
import Style from './Style/Style';
import { MediaEditControl } from '../../../../../bpl-tools/Components';

const Settings = ({ attributes, setAttributes, device }) => {

	const { imgUrl } = attributes
	// console.log('img change', imgUrl)

	console.log('device select.....', device)

	return <>
		<InspectorControls>
			<div className='bBlocksInspectorInfo'>
				Need more block like this? Checkout the bundle ➡ <a href='https://wordpress.org/plugins/b-blocks' target='_blank' rel='noopener noreferrer'>B Blocks</a>
			</div>

			<TabPanel className='bPlTabPanel wp-block-b-blocks-test-purpose' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>
				{
					tab => <>
						{'general' === tab.name && <General attributes={attributes} setAttributes={setAttributes} />}

						{'style' === tab.name && <Style attributes={attributes} setAttributes={setAttributes} />}
					</>
				}
			</TabPanel>
		</InspectorControls>


		<BlockControls>
			<Toolbar>
				{
					imgUrl?.url && <MediaEditControl
						label='Edit Image'
						icon='format-image'
						types={['image']}
						value={imgUrl}
						onChange={(v) => setAttributes({ imgUrl: v })}
					/>
				}
			</Toolbar>
		</BlockControls>
	</>;
};
export default Settings;