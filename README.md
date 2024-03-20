* Install flask: `pip install flask` 
* also requires [jspsych-builder](https://github.com/bjoluc/jspsych-builder?tab=readme-ov-file). 
* To set up, first run `jspsych build`, then unzip the generated experiment to the current directory: `unzip packaged/experiment_0.1.0.zip -d .` If you make changes to any of the `src` files, you'll need to run this command again to update the experiment.

* Start the server: `python app.py`, then go to `http://localhost:3000`
