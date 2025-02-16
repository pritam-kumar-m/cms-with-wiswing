"use client";

import dynamic from 'next/dynamic';

// Plugin registry
const plugins = {
  slider: dynamic(() => import('./Slider')),
  // Add more plugins here
};

export const getPlugin = (pluginName) => {
  const plugin = plugins[pluginName];
  if (!plugin) {
    throw new Error(`Plugin "${pluginName}" not found.`);
  }
  return plugin;
};