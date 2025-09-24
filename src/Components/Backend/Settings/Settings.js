import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { TabPanel, } from '@wordpress/components';
import { tabController } from '../../../../../bpl-tools/utils/functions';
import { blocks, generalStyleTabs } from '../../../utils/options';
import General from './General/General';
import Style from './Style/Style';
import { BplBlockPreview } from '../../../../../bpl-tools/Components';
import { useState } from 'react';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { AboutProModal } from "../../../../../bpl-tools/ProControls";

const Settings = ({ attributes, setAttributes, device, clientId, isPremium, siteUrl }) => {

	const { theme } = attributes || {};

	const [isProModalOpen, setIsProModalOpen] = useState(false);
	const siteLocation = `${siteUrl}/wp-admin/edit.php?post_type=service_card&page=service_card_Dashboard#/pricing`;


	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel wp-block-b-blocks-test-purpose' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>
				{
					tab => <>
						{'general' === tab.name && <General  {...{ attributes, setAttributes, device, isPremium, setIsProModalOpen }} />}

						{'style' === tab.name && <Style  {...{ attributes, setAttributes, device, isPremium, setIsProModalOpen }} />}
					</>
				}
			</TabPanel>
		</InspectorControls>


		<BlockControls>
			<BplBlockPreview
				clientId={clientId}
				value={theme}
				blocks={blocks}
			/>
		</BlockControls>

		<AboutProModal
			isProModalOpen={isProModalOpen}
			setIsProModalOpen={setIsProModalOpen}
			link={siteLocation}
		>
			<li>
				<strong>
					{__("Layout Flexible design: ", "services-card")}
				</strong>
				{__("Service Card Icon text description Design ", "services-card")}
			</li>
		</AboutProModal>

	</>;
};


export default compose(
	withSelect((select) => {
		return {
			siteUrl: select('core').getSite()?.url,
		};
	})
)(Settings);