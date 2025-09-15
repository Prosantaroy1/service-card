import { __ } from '@wordpress/i18n';
import { PanelBody, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { AdvBackground, Background, BButtonGroup, BoxControl, BplBlockPreview, BtnGroup, ColorControl, ColorsControl, Device, Gradient, IconControl, IconLibrary, ItemsPanel, Label, MediaPlaceholder, MultiSelectControl, OverlayControl, SelectPureControl, ShadowControl, Typography } from '../../../../../../bpl-tools/Components';

// import AdvTransform from '../../../../../../bpl-tools/Components'


const Style = ({ attributes, setAttributes }) => {

  const { textType, containerShadow, textBg, boxBackground, contentColors, btnGroup, Icons, IconsLibrary, imgUrl, paraColor, BoxModelPadding, ImgWidth, ImgHeigth, subtitleColor, BoxBorderRadius, titleAlign, subtitleAlign } = attributes;

  console.log('contentColors--', contentColors)

  const options = [
    { label: __('Default', 'text-domain'), value: 'default' },
    { label: __('Option 1', 'text-domain'), value: 'option1' }
  ];

  const Lavels = [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
    { label: "Option 3", value: "opt3" },
    { label: "Option 4", value: "opt4" },
    { label: "Option 5", value: "opt5" },
  ];

  return (
    <>
      <PanelBody className='bPlPanelBody' title={__('Styles', 'b-blocks')} initialOpen={false}>

        {/* para typography */}
        <Typography
          value={textType?.typo}
          onChange={v => setAttributes({
            textType: { ...textType, typo: v }
          })}

        />
        {/* para color add */}
        <ColorControl
          label="Title Color"
          value={paraColor}
          onChange={(v) => {
            setAttributes({
              paraColor: v
            })
          }}
        />
        <ColorControl
          label="Sub-Title Color"
          value={subtitleColor}
          onChange={(v) => {
            setAttributes({
              subtitleColor: v
            })
          }}
        />


        {/* boxControl */}
        <BoxControl
          label={__('Box Model')}
          values={BoxModelPadding}
          onChange={(v) => setAttributes({ BoxModelPadding: v })}
        />
        {/* bg */}
        <Background
          label="BackgroundColor-bg"
          value={boxBackground}
          onChange={(v) => setAttributes({ boxBackground: v })}
        />

        {/* shadowControl */}
        <ShadowControl label={__('Shadow', 'test-purpose')} value={containerShadow} onChange={(v) => setAttributes({ containerShadow: v })} />

        {/* img width or height */}
        <UnitControl
          label="Image Width"
          value={ImgWidth}
          onChange={(v) => setAttributes({ ImgWidth: v })}
        />
        <UnitControl
          label="Image Height"
          value={ImgHeigth}
          onChange={(v) => setAttributes({ ImgHeigth: v })}
        />
        {/* IconsLibrary useCase Problem */}
        <IconLibrary label={__('Social IconsLibrary')} value={IconsLibrary} onChange={(v) => setAttributes({ IconsLibrary: v })} />
        {/* radius */}
        <BoxControl
          label="Content Border Radius"
          values={BoxBorderRadius}
          onChange={(v) => setAttributes({ BoxBorderRadius: v })}
        />

        <SelectPureControl label={__('Select')} onChange={(v) => console.log(v)} />
        {/* problem ---- */}
        <Gradient label={__('Bg-Color')} value={textBg} onChange={(v) => setAttributes({ textBg: v })} />
        {/* --------content colors------ */}
        <ColorsControl label={__('Content-Colors')} value={contentColors} onChange={(v) => setAttributes({ contentColors: v })} />

        {/* advanceBgColor Problem */}
        <AdvBackground label={__('AdBgColor')} onChange={(v) => console.log('Ad-bg', v)} />
        {/* AdvTransform */}
        {/* <AdvTransform label={__('AdvTransform')} onChange={(v) => console.log(v)} /> */}
        {/* Background */}
        <Background label={__('Background')} onChange={(v) => console.log('background', v)} />

        {/* btn-Group */}
        <BtnGroup value={btnGroup} label={__('BtnGroup')} onChange={val => setAttributes({ btnGroup: val })} options={options} />

        {/* Device */}
        <p>Device Select</p>
        <Device label={__('Device')} onChange={(v) => console.log('Device', v)} />
        {/* DynamicTag */}
        {/* <DynamicTag label={__('Dynamic Title')} /> */}
        {/* Icons */}
        <IconControl label={__('Icons')} value={Icons} onChange={(v) => setAttributes({ Icons: v })} />


        {/* ItemsPanel Problem */}
        {/* <ItemsPanel label={__('ItemsPanel')} onChange={(v) => console.log('ItemsPanel', v)} /> */}

        {/* BplBlockPreview Problem */}
        {/* <BplBlockPreview label={__('BplBlockPreview')} onChange={(v) => console.log('BplBlockPreview', v)} /> */}
        {/* Label */}
        <Label>
          <p>label one</p>
        </Label>
        {/* OverlayControl  */}
        <OverlayControl label={__('OverlayControl')} onChange={(v) => console.log(v)} />
        {/* MultiSelectControl */}
        <MultiSelectControl label={__('MultiSelectControl')} options={Lavels} onChange={(v) => console.log(v)} />

        {/* Image */}

        {/* <MediaPlaceholder label={__('Image Upload')} value={imgUrl} onChange={(v) => setAttributes({ imgUrl: v })} /> */}

      </PanelBody>
      <PanelBody className='bPlPanelBody' title={__('Styles Pro', 'b-blocks')} initialOpen={false}>

        <BButtonGroup
          label={__('Title Text Align', 'b-blocks')}
          options={[
            { label: __('Left', 'b-blocks'), value: 'left' },
            { label: __('Center', 'b-blocks'), value: 'center' },
            { label: __('Right', 'b-blocks'), value: 'right' },
          ]}
          value={titleAlign}
          onChange={(v) =>
            setAttributes({
              titleAlign: v
            })
          }

        />
        <BButtonGroup
          label={__('Sub-Title Text Align', 'b-blocks')}
          options={[
            { label: __('Left', 'b-blocks'), value: 'left' },
            { label: __('Center', 'b-blocks'), value: 'center' },
            { label: __('Right', 'b-blocks'), value: 'right' },
          ]}
          value={subtitleAlign}
          onChange={(v) =>
            setAttributes({
              subtitleAlign: v
            })
          }

        />

      </PanelBody>
    </>
  )
}

export default Style