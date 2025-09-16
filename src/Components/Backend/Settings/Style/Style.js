import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { Background, BoxControl, ColorControl, Device, Label, Typography } from '../../../../../../bpl-tools/Components';
import { HeightControl } from '@wordpress/block-editor'
import { updateData } from '../../../../utils/functions';
import { BorderControl } from '../../../../../../bpl-tools/Components/Deprecated';



const Style = ({ attributes, setAttributes, device }) => {

  const { Styles = {}, column = {} } = attributes || {};

  const { SectionContainer, cardBody } = Styles;

  const { title, description, icon } = cardBody;

  console.log('style---', icon?.width, icon?.height, icon?.colors)


  return (
    <>
      <PanelBody className='bPlPanelBody' title={__('Grid Layout', 'service-card')} initialOpen={false}>
        <PanelRow><Label className=''>Column</Label> <Device /> </PanelRow>
        <RangeControl
          max={12}
          min={1}
          value={column[device]}
          onChange={v => setAttributes({ column: updateData(column, v, device) })}
        />
        <UnitControl
          label={__("GridLayout Gap")}
          value={column?.gap}
          onChange={(v) => setAttributes({
            column: updateData(column, v, 'gap')
          })}
        />
      </PanelBody>
      <PanelBody className='bPlPanelBody' title={__('Container Styles', 'service-card')} initialOpen={false}>
        <Background
          label="Container Background"
          value={SectionContainer?.bg}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'SectionContainer', 'bg')
          })}
        />
        <PanelRow><Label className=''>Padding</Label> <Device /> </PanelRow>
        <BoxControl

          values={SectionContainer?.padding?.[device]}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'SectionContainer', 'padding', device)
          })}
        />
        <BorderControl
          label='Border'
          value={SectionContainer?.border}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'SectionContainer', 'border')
          })}
        />

      </PanelBody>
      <PanelBody className='bPlPanelBody' title={__('Card Content Styles', 'service-card')} initialOpen={false}>

        <HeightControl
          label="Icon Width"
          value={icon?.width}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'icon', 'width')
          })}
        />
        <HeightControl
          label="Icon height"
          value={icon?.height}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'icon', 'height')
          })}
        />
        <ColorControl
          label='Icon Color'
          value={icon?.colors}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'icon', 'colors')
          })}
        />
        <hr />
        <Typography
          label='Title Typography'
          value={title?.typo}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'title', 'typo')
          })}
        />
        <Background
          label="Title Background"
          value={title?.bg}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'title', 'bg')
          })}
        />
        <ColorControl
          label='Title Color'
          value={title?.colors}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'title', 'colors')
          })}
        />
        <hr />
        <Typography
          label='description Typography'
          value={description?.typo}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'description', 'typo')
          })}
        />
        <ColorControl
          label='description Color'
          value={description?.colors}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'description', 'colors')
          })}
        />

      </PanelBody>
    </>
  )
}

export default Style