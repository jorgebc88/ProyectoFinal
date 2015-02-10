package prueba2;

	 // Import the basic graphics classes.  
	 // The problem here is that we read the image with OpenCV into a Mat object.  
	 // But OpenCV for java doesn't have the method "imshow", so, we got to use  
	 // java for that (drawImage) that uses Image or BufferedImage.  
	 // So, how to go from one the other... Here is the way...  
	 import java.awt.*;  
import java.awt.image.BufferedImage;  
import java.io.ByteArrayInputStream;
import java.io.InputStream;

import javax.imageio.ImageIO;
import javax.swing.*;  

import org.opencv.core.Core;
import org.opencv.core.Mat;  
import org.opencv.core.MatOfByte;
import org.opencv.core.MatOfRect;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.highgui.Highgui;
import org.opencv.highgui.VideoCapture;  
import org.opencv.objdetect.CascadeClassifier;
import org.opencv.video.BackgroundSubtractor;
import org.opencv.video.BackgroundSubtractorMOG;
import org.opencv.video.BackgroundSubtractorMOG2;
import org.opencv.video.KalmanFilter;

	 public class prueba2 extends JPanel{  
		 private static final long serialVersionUID = 1L;  
		 private BufferedImage image;  
		 private Image image2;
		 //global variables
		 Mat frame; //current frame
		 Mat fgMaskMOG; //fg mask generated by MOG method
		 Mat fgMaskMOG2; //fg mask fg mask generated by MOG2 method
		 int keyboard;

		   // Create a constructor method  
		 public prueba2(){  
			 super();  
		 }  
		 private BufferedImage getimage(){  
			 return image;  
		 }  
		 private void setimage(BufferedImage newimage){  
			 image=newimage;  
			 return;  
		 }  
		 private Image getimage2(){  
			 return image2;  
		 }  
		 private void setimage1(Image newimage){  
			 image2=newimage;  
			 return;  
		 } 
	   /**  
	    * Converts/writes a Mat into a BufferedImage.  
	    *  
	    * @param matrix Mat of type CV_8UC3 or CV_8UC1  
	    * @return BufferedImage of type TYPE_3BYTE_BGR or TYPE_BYTE_GRAY  
	    */  
		 public static BufferedImage matToBufferedImage(Mat matrix) {  
		     int cols = matrix.cols();  
		     int rows = matrix.rows();  
		     int elemSize = (int)matrix.elemSize();  
		     byte[] data = new byte[cols * rows * elemSize];  
		     int type;  
		     matrix.get(0, 0, data);  
		     switch (matrix.channels()) {  
		       case 1:  
		         type = BufferedImage.TYPE_BYTE_GRAY;  
		         break;  
		       case 3:  
		         type = BufferedImage.TYPE_3BYTE_BGR;  
		         // bgr to rgb  
		         byte b;  
		         for(int i=0; i<data.length; i=i+3) {  
		           b = data[i];  
		           data[i] = data[i+2];  
		           data[i+2] = b;  
		         }  
		         break;  
		       default:  
		         return null;  
		     }  
		     BufferedImage image2 = new BufferedImage(cols, rows, type);  
		     image2.getRaster().setDataElements(0, 0, cols, rows, data);  
		     return image2;  
		 }  
	   
		 public void paintComponent(Graphics g){  
			 BufferedImage temp=getimage();  
			 g.drawImage(temp,10,10,temp.getWidth(),temp.getHeight(), this);  
		 }
	   
		 public static void main(String arg[]) throws InterruptedException{  
		    // Load the native library.  
			System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
		    JFrame frame = new JFrame("BasicPanel"); 
		    JFrame frame2 = new JFrame("NotBasic"); 
		    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);  
		    frame.setSize(400,400);  
		    frame2.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);  
		    frame2.setSize(400,400);  
		    prueba2 prueba = new prueba2();  
		    prueba2 prueba2 = new prueba2();  
		    frame.setContentPane(prueba);       
		    frame.setVisible(true);     
		    frame2.setContentPane(prueba2);       
		    frame2.setVisible(true);       
		    Mat image=new Mat();  
		    BufferedImage temp, temp2;  
		    Image temp3;
		    BackgroundSubtractorMOG pMOG = new BackgroundSubtractorMOG(10000, 50, 0.05,0);
		    BackgroundSubtractorMOG2 pMOG2 = new BackgroundSubtractorMOG2();//1000,4,true);
		    Mat fgMaskMOG = new Mat(); //fg mask generated by MOG method
		    Mat fgMaskMOG2 = new Mat(); //fg mask fg mask generated by MOG2 method
		    KalmanFilter kf = new KalmanFilter();
		    
		    String path;
		    path = "C:/Traffic.avi";
		    VideoCapture capture =new VideoCapture();
		    //Para que funciones el VideoCapture con un video en el equipo hay q agregar 
		    //"C:\opencv\build\x64\vc12\bin" al path en las variables del sistema
		    capture.open("C:/video.avi"); 
		    if( capture.isOpened())  
		    {  
		    	while( true )  
		    	{  
		    		capture.read(image);  
		    		if( !image.empty() )  
		    		{  
		    			frame.setSize(image.width()+40,image.height()+60);  
		    			frame2.setSize(image.width()+40,image.height()+60);
		    			frame2.setLocation(700, 0);
//		    			temp=matToBufferedImage(image);  
//		    			prueba.setimage(temp); 
//		    			prueba.repaint();
//		    			pMOG2.apply(image,fgMaskMOG);
//		    			temp2=matToBufferedImage(fgMaskMOG);  
//		    			prueba2.setimage(temp2); 
//		    			prueba2.repaint();
		    			pMOG.apply(image,fgMaskMOG,0.1);		    			
		    			temp3=prueba.convertir(fgMaskMOG);  
		    			prueba.setimage((BufferedImage)temp3); 
		    			prueba.repaint();
		    			pMOG2.apply(image,fgMaskMOG2,0.1);
		    			temp3=prueba2.convertir(image);  
		    			prueba2.setimage((BufferedImage)temp3); 
		    			prueba2.repaint();

		    			
		    		}  
		    		else  
		    		{  
		    			System.out.println(" --(!) No captured frame -- Break!");  
		    			break;  
		    		}  
		        }  
		    }  
		    return;  
		 }  
		 
		 private Image convertir(Mat imagen) {
		        MatOfByte matOfByte = new MatOfByte();
		        Highgui.imencode(".jpg", imagen, matOfByte);
		 
		        byte[] byteArray = matOfByte.toArray();
		        BufferedImage bufImage = null;
		 
		        try {
		 
		            InputStream in = new ByteArrayInputStream(byteArray);
		            bufImage = ImageIO.read(in);
		        } catch (Exception e) {
		            e.printStackTrace();
		        }
		        return (Image)bufImage;
		    }


}  	