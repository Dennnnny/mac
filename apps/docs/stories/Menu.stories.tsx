import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Menu } from "ui/Desktop/Menu";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Menu",
  component: Menu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Menu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  open: true,
  pos: {
    x: 100,
    y: 100,
  },
};

export const HeaderType = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HeaderType.args = {
  open: true,
  pos: {
    x: 100,
    y: 100,
  },
  type: "header",
};
