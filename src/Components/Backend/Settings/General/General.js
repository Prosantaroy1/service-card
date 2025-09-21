import { __ } from "@wordpress/i18n";
import { PanelBody, SelectControl } from "@wordpress/components";
import { themeSwitch } from "../../../../utils/functions";
import { themeOption } from '../../../../utils/options';
import { ItemsPanel } from '../../../../../../bpl-tools/Components';
import ServiceItemPanel from '../../ServiceItemPanel/ServiceItemPanel';

const General = ({ attributes, setAttributes }) => {

  const { theme, activeIndex } = attributes;

  return (
    <>
      <PanelBody
        className="bPlPanelBody"
        title={__("Theme Switch", "service-card")}
        initialOpen={true}
      >
        <SelectControl
          labelPosition="left"
          value={theme}
          options={themeOption}
          onChange={(v) => setAttributes(themeSwitch(v, attributes))}
          __next40pxDefaultSize={true}
        />

      </PanelBody>
      <PanelBody
        className="bPlPanelBody"
        title={__("Service Card Content", "service-card")}
        initialOpen={true}
      >
        <ItemsPanel
          {...{ attributes, setAttributes }}
          arrKey="serviceData"
          activeIndex={activeIndex}
          newItem={{
            "id": 1,
            "title": "Web Development",
            "description": "Build modern, responsive websites and web applications using the latest technologies and best practices to deliver exceptional user experiences.",
            "icon": "<svg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 16 16' height='1em' width='1em' xmlns='http: //www.w3.org/2000/svg'><path fill-rule='evenodd' d='M5.854 4.146a.5.5 0 010 .708L2.707 8l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm4.292 0a.5.5 0 000 .708L13.293 8l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0z' clip-rule='evenodd'></path></svg>"
          }}
          ItemSettings={ServiceItemPanel}
          design="sortable"
          title='title'
        />

      </PanelBody>
    </>
  );
};

export default General;
