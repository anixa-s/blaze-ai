## Canada Wildfire Prediction Using Deep Learning
The objective is to predict the future fire occurrences for the next year given various inputs from the past year and current year. The problem of wildfire prediction is defined as semantic segmentation problem here meaning each pixel is assigned a probability between 0 and 1 of being the class fire. The type of input data has an impact on the temporal extent chosen as input to the model.  

For instance, vegetation data **prior** to the period to predict is used while weather data and any data that is not affected by fires is taken from the period to predict.  
As an example, to predict the period 2023, we use vegetation data from 2022 and weather data from 2023.  

The objective of this project is to demonstrate the potential of deep learning in predicting wildfires across Canada.   
The model developed here serves as a proof of concept and is not yet fully optimized, its goal is to offer valuable insights into how advanced machine learning techniques can be applied to wildfire prediction.  

> BlazeAI Website: https://blazeai.framer.website/
