import { produce } from "immer";

export const updateData = (attr, value, ...props) => {
  if (props.length === 0) {
    return value;
  }
  const [currentProp, ...remainingProps] = props;
  if (remainingProps.length === 0) {
    return produce(attr, draft => {
      draft[currentProp] = value;
    });
  }
  return produce(attr, draft => {
    if (!Object.prototype.hasOwnProperty.call(draft, currentProp)) {
      draft[currentProp] = {};
    }
    draft[currentProp] = updateData(draft[currentProp], value, ...remainingProps);
  });
};


export const themeSwitch = (theme, attributes) => {

  return produce(attributes, (draft) => {
    draft['theme'] = theme;

    switch (theme) {
      case 'default':
        draft['Styles'] = {
          "SectionContainer": {
            "bg": {
              "color": "#fff"
            },
            "padding": {
              "desktop": {
                "top": "32px",
                "left": "24px",
                "bottom": "32px",
                "right": "24px"
              },
              "tablet": {
                "top": "32px",
                "left": "24px",
                "bottom": "32px",
                "right": "24px"
              },
              "mobile": {
                "top": "32px",
                "left": "24px",
                "bottom": "32px",
                "right": "24px"
              }
            },
            "border": {
              "width": "",
              "color": "",
              "style": "",
              "side": "",
              "radius": "16px"
            }
          },
          "cardBody": {
            "title": {
              "bg": {
                "color": "#fff"
              },
              "colors": "#1a202c",
              "typo": {
                "fontWeight": 600,
                "fontSize": {
                  "desktop": 24,
                  "tablet": 16,
                  "mobile": 12
                },
                "lineHeight": 1.5,
                "fontFamily": "Montserrat, sans-serif"
              }
            },
            "description": {
              "bg": {
                "color": "#fff"
              },
              "colors": "#4a5568",
              "typo": {
                "fontWeight": 500,
                "fontSize": {
                  "desktop": 16,
                  "tablet": 14,
                  "mobile": 12
                },
                "lineHeight": 1.5,
                "fontFamily": "Montserrat, sans-serif"
              }
            },
            "icon": {
              "width": "40px",
              "height": "40px",
              "colors": "#4a5568"
            }
          }
        }
        draft['column']["desktop"] = 3
        draft['column']["tablet"] = 2
        draft['column']["mobile"] = 1
        draft['column']["gap"] = "16px"

        break;
      case 'themeTwo':
        draft['Styles'] = {
          "SectionContainer": {
            "bg": {
              "color": "#fff"
            },
            "padding": {
              "desktop": {
                "top": "0px",
                "left": "0px",
                "bottom": "0px",
                "right": "0px"
              },
              "tablet": {
                "top": "0px",
                "left": "0px",
                "bottom": "0px",
                "right": "0px"
              },
              "mobile": {
                "top": "0px",
                "left": "0px",
                "bottom": "0px",
                "right": "0px"
              }
            },
            "border": {
              "width": "",
              "color": "",
              "style": "",
              "side": "",
              "radius": "16px"
            }
          },
          "cardBody": {
            "title": {
              "bg": {
                "color": "#fff"
              },
              "colors": "#1a202c",
              "typo": {
                "fontWeight": 600,
                "fontSize": {
                  "desktop": 24,
                  "tablet": 16,
                  "mobile": 12
                },
                "lineHeight": 1.5,
                "fontFamily": "Montserrat, sans-serif"
              }
            },
            "description": {
              "bg": {
                "color": "#fff"
              },
              "colors": "#4a5568",
              "typo": {
                "fontWeight": 500,
                "fontSize": {
                  "desktop": 16,
                  "tablet": 14,
                  "mobile": 12
                },
                "lineHeight": 1.5,
                "fontFamily": "Montserrat, sans-serif"
              }
            },
            "icon": {
              "width": "40px",
              "height": "40px",
              "colors": "#4a5568"
            }
          }
        }
        draft['column']["desktop"] = 3
        draft['column']["tablet"] = 2
        draft['column']["mobile"] = 1
        draft['column']["gap"] = "16px"

        break;
      case 'themeThree':
        draft['Styles'] = {
          "SectionContainer": {
            "bg": {
              "color": "#fff"
            },
            "padding": {
              "desktop": {
                "top": "32px",
                "left": "24px",
                "bottom": "32px",
                "right": "24px"
              },
              "tablet": {
                "top": "32px",
                "left": "24px",
                "bottom": "32px",
                "right": "24px"
              },
              "mobile": {
                "top": "32px",
                "left": "24px",
                "bottom": "32px",
                "right": "24px"
              }
            },
            "border": {
              "width": "",
              "color": "",
              "style": "",
              "side": "",
              "radius": "16px"
            }
          },
          "cardBody": {
            "title": {
              "bg": {
                "color": "#fff"
              },
              "colors": "#1a202c",
              "typo": {
                "fontWeight": 600,
                "fontSize": {
                  "desktop": 24,
                  "tablet": 16,
                  "mobile": 12
                },
                "lineHeight": 1.5,
                "fontFamily": "Montserrat, sans-serif"
              }
            },
            "description": {
              "bg": {
                "color": "#fff"
              },
              "colors": "#4a5568",
              "typo": {
                "fontWeight": 500,
                "fontSize": {
                  "desktop": 16,
                  "tablet": 14,
                  "mobile": 12
                },
                "lineHeight": 1.5,
                "fontFamily": "Montserrat, sans-serif"
              }
            },
            "icon": {
              "width": "40px",
              "height": "40px",
              "colors": "#4a5568"
            }
          }
        }
        draft['column']["desktop"] = 3
        draft['column']["tablet"] = 2
        draft['column']["mobile"] = 1
        draft['column']["gap"] = "16px"
        break;
    }


  })

}