import java.awt.BorderLayout;
import java.awt.Canvas;
import java.awt.EventQueue;

import javax.swing.JFrame;

import org.opencv.core.*;
import org.opencv.highgui.Highgui;
import org.opencv.highgui.VideoCapture;

public class openc {

private JFrame frame;

/**
 * Launch the application.
 */
public static void main(String[] args) {
    EventQueue.invokeLater(new Runnable() {
        public void run() {
            try {
                openc window = new openc();
                window.frame.setVisible(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    });
}

/**
 * Create the application.
 */
public openc() {
    initialize();
}

/**
 * Initialize the contents of the frame.
 */
private void initialize() {
    frame = new JFrame();
    frame.setBounds(100, 100, 450, 300);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

    Canvas canvas = new Canvas();
    frame.getContentPane().add(canvas, BorderLayout.CENTER);

            System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
            VideoCapture camera = new VideoCapture(0);
            if(!camera.isOpened()){
                System.out.println("Error");
            }
            else {
                Mat iframe = new Mat();
                while(true){
                    if (camera.read(iframe)){
                        System.out.println("Frame Obtained");
                        System.out.println("Captured Frame Width " + 
                        iframe.width() + " Height " + iframe.height());
                        while(true){
                            //Highgui.imwrite(canvas, iframe);
                        }


                    }
                }   
            }
            camera.release();
            

}

}