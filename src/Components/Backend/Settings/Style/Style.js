import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow, RangeControl, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { Background, BButtonGroup, BoxControl, ColorControl, ColorsControl, Device, Label, ShadowControl, Typography } from '../../../../../../bpl-tools/Components';
import { HeightControl } from '@wordpress/block-editor'
import { updateData } from '../../../../utils/functions';
import { BorderControl } from '../../../../../../bpl-tools/Components/Deprecated';

const Style = ({ attributes, setAttributes, device }) => {

  const { Styles = {}, column = {}, theme } = attributes || {};
  const { SectionContainer, cardBody } = Styles;
  const { title, description, icon } = cardBody;

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
        <ShadowControl
          label='Box Shadow'
          value={SectionContainer?.shadow}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'SectionContainer', 'shadow')
          })}
        />

      </PanelBody>
      <PanelBody className='bPlPanelBody' title={__('Content Styles', 'service-card')} initialOpen={false}>
        <ToggleControl
          __nextHasNoMarginBottom={true}
          label="Icon Show & Hidden"
          checked={icon?.show}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'icon', 'show')
          })}
        />
        {
          icon?.show === false && (<>
            <HeightControl
              label="Icon Size"
              value={icon?.size}
              onChange={(v) => setAttributes({
                Styles: updateData(Styles, v, 'cardBody', 'icon', 'size')
              })}
            />
            <ColorControl
              label='Icon Color'
              value={icon?.color}
              onChange={(v) => setAttributes({
                Styles: updateData(Styles, v, 'cardBody', 'icon', 'color')
              })}
            />
            <Background
              label="Icon Background"
              value={icon?.bg}
              onChange={(v) => setAttributes({
                Styles: updateData(Styles, v, 'cardBody', 'icon', 'bg')
              })}
            />
          </>)
        }

        <hr />
        <Typography
          label='Title Typography'
          value={title?.typo}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'title', 'typo')
          })}
        />
        <ColorsControl
          label='Title Color'
          value={title?.colors}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'title', 'colors')
          })}
        />

        {
          theme === 'default' || theme === 'themeThree' ? (
            <BButtonGroup
              className="mt10"
              label={__('Text Align', 'service-card')}
              options={[
                { label: __('Left', 'service-card'), value: 'left' },
                { label: __('Center', 'service-card'), value: 'center' },
                { label: __('Right', 'service-card'), value: 'right' },
              ]}
              value={title?.textAlign}
              onChange={(v) =>
                setAttributes({
                  Styles: updateData(Styles, v, 'cardBody', 'title', 'textAlign')
                })
              }
              activeBg="#007cba"
              inactiveColor="#555"
              activeColor="#fff"
              borderRadius="4px"
              paddingX="12px"
              paddingY="6px"
              fontSize="13px"
              fontWeight={500}
            />
          ) : null
        }
        <hr />
        <Typography
          label='description Typography'
          value={description?.typo}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'description', 'typo')
          })}
        />
        <ColorsControl
          label='Title Color'
          value={description?.colors}
          onChange={(v) => setAttributes({
            Styles: updateData(Styles, v, 'cardBody', 'description', 'colors')
          })}
        />
        {
          theme === 'default' || theme === 'themeThree' ? (
            <BButtonGroup
              className="mt10"
              label={__('Text Align', 'service-card')}
              options={[
                { label: __('Left', 'service-card'), value: 'left' },
                { label: __('Center', 'service-card'), value: 'center' },
                { label: __('Right', 'service-card'), value: 'right' },
              ]}
              value={description?.textAlign}
              onChange={(v) =>
                setAttributes({
                  Styles: updateData(Styles, v, 'cardBody', 'description', 'textAlign')
                })
              }
              activeBg="#007cba"
              inactiveColor="#555"
              activeColor="#fff"
              borderRadius="4px"
              paddingX="12px"
              paddingY="6px"
              fontSize="13px"
              fontWeight={500}
            />
          ) : null
        }

      </PanelBody>
    </>
  )
}

export default Style