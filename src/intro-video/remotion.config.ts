import { Config } from '@remotion/cli/config';

// Set video configuration for optimal quality and performance
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setPixelFormat('yuv420p');
Config.setCodec('h264');

// Enable concurrent rendering for better performance
Config.setConcurrency(2);

// Enable GL renderer for better performance with complex animations
Config.setChromiumOpenGlRenderer('angle');

// Set encoding options for better compression
Config.setEncodingBufferSize('512M');
Config.setEncodingMaxRate('2M');

export {};