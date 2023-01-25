import streamlit as st # web development
import numpy as np # np mean, np random 
import pandas as pd # read csv, df manipulation
import time # to simulate a real time data, time loop 
import plotly.express as px # interactive charts



st.set_page_config(layout='wide', initial_sidebar_state='expanded')


    


# Row A
st.markdown('#### TEAM GALILEO 2022ASI-023')
col1, col2 = st.columns(2)
col1.metric("Mission Date", "23/01")
col2.metric("Mission mode", "On", )
#col3.metric("Humidity", "86%", "4%")

# Row B
weather = df = pd.read_csv(r'C:\Users\vidhiti\Downloads\test.csv')
#stocks = pd.read_csv('https://raw.githubusercontent.com/dataprofessor/data/master/stocks_toy.csv')
#c1, c2 = st.columns((7,3))
#with c1:
 #   st.markdown('### Heatmap')
  #  plost.time_hist(
   # data=weather,
    #date='date',
    #x_unit='week',
    #y_unit='day',
    #color=time_hist_color,
    #aggregate='median',
    #legend=None,
    #height=345,
    #use_container_width=True)
#with c2:
    #st.markdown('### Donut chart')
   # plost.donut_chart(
       # data=stocks,
       # theta=donut_theta,
        #color='company',
       # legend='bottom', 
       # use_container_width=True)

# Row C
st.markdown('### Line chart')
st.line_chart(weather ,x = 'Altitude')
