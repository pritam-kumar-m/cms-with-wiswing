"use client";

import React from "react";
import { getPlugin } from "../plugins";

const ContentBlock = ({ type, props }) => {
  const PluginComponent = getPlugin(type);

  if (!PluginComponent) {
    return <div>Plugin not found</div>;
  }

  return <PluginComponent {...props} />;
};

export default ContentBlock;
