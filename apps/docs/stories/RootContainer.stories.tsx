import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { RootContainer } from "ui/Container/RootContainer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/RootContainer",
  component: RootContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof RootContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RootContainer> = (args) => <RootContainer {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  pos: { x: 0, y: 0 },
  size: { width: 300, height: 300 },
};
