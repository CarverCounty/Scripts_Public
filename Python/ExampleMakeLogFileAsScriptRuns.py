# This is illustrates how you can have your python script create a log file to
# help in debugging. Can be useful when not running it interactively.

import inspect #This is just for naming the log file
import datetime #This is also for naming the log file

todaysDate = str(datetime.datetime.now().strftime("%Y%m%d_%H%M%S"))
debugFile = inspect.getfile(inspect.currentframe()).replace(".py","_"+todaysDate+".txt")
debugText = ""
writeDebugFile = open(debugFile,"w")
writeDebugFile.close()

def printit(inString):
    print inString
    thisString = str(datetime.datetime.now().strftime("%H:%M:%S"))+"  "+str(inString) +"\n"
    tmpfile = open(debugFile,"a")
    tmpfile.write(thisString)
    tmpfile.close()


printit("Start")

#Do some stuff

printit("End")
