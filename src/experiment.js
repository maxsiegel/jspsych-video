/**
 * @title video
 * @description
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import PreloadPlugin from "@jspsych/plugin-preload";
import RecordVideoExtension from "@jspsych/extension-record-video"
import InitializeCameraPlugin from "@jspsych/plugin-initialize-camera"
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response"

import {
    initJsPsych
} from "jspsych";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */

function saveData(name, data) {
    fetch('/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filename: name,
                data: data
            }),
        })
        .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function run({
    assetPaths,
    input = {},
    environment,
    title,
    version
}) {
    const jsPsych = initJsPsych({
        extensions: [{
            type: RecordVideoExtension
        }]
    });

    const timeline = [];
    // Preload assets
    timeline.push({
        type: PreloadPlugin,
        images: assetPaths.images,
        audio: assetPaths.audio,
        video: assetPaths.video,
    });

    // Welcome screen
    timeline.push({
        type: HtmlKeyboardResponsePlugin,
        stimulus: "<p>Welcome to video!<p/>",
    });

    const init_camera = {
        type: InitializeCameraPlugin,
        mime_type: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
    };
    timeline.push(init_camera)
    timeline.push({
        type: HtmlButtonResponsePlugin,
        stimulus: "test",
        choices: ["continue"],
        extensions: [{
            type: RecordVideoExtension
        }],
        // on_finish: function() {
        //     console.log(jsPsych.data.getLastTrialData())
        // }
        on_finish: function() {
            let video_data = jsPsych.data.getLastTrialData().trials[0].record_video_data;
            saveData("test", video_data)
        }
    });

    await jsPsych.run(timeline);

    // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
    // if you handle results yourself, be it here or in `on_finish()`)
    return jsPsych;
}