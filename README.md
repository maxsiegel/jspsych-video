* Install flask: `pip install flask` 
* also requires [jspsych-builder](https://github.com/bjoluc/jspsych-builder?tab=readme-ov-file). 
* To set up, first run `jspsych build`, then unzip the generated experiment to the current directory: `unzip packaged/experiment_0.1.0.zip -d .` If you make changes to any of the `src` files, you'll need to run this command again to update the experiment.

* Start the server: `python app.py`, then go to `http://localhost:3000`

* Data is saved in base64 format to the `data` folder. Run `decode.py` to convert it to a video file, which ends up in `data_videos`. NOTE for now, the filename is hardcoded, so only one video is saved and any previous video is overwritten.
