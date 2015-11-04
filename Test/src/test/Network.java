package test;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class Network {
	
	private String message;
	
	 private URL modelUrl;
	 private HttpURLConnection modelConnection;
	 private BufferedReader modelReader;
	
	public Network(String message) {
		this.message = "hello" + message;
		
		try {
			modelUrl = new URL("http", "127.0.0.1", "/test.txt");

			modelConnection = (HttpURLConnection) modelUrl.openConnection();
			modelConnection.setRequestProperty("Accept-Encoding", "identity");
			modelConnection.setUseCaches(true);
			modelConnection.setDoInput(true);
			modelConnection.connect();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		try {
			modelReader = new BufferedReader(new InputStreamReader(modelConnection.getInputStream(), "UTF-8"), 256);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			System.out.println("Could not find file");
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		String currentLine;
		try {
		while ((currentLine = modelReader.readLine()) != null) {

			if (currentLine.length() > 0) {
				System.out.println(currentLine);
			}
		}
		} catch (final IOException e) {
			System.out.println("Failed to read file: " + modelReader.toString());
		}
				
	}
	
	String getMessage() { return this.message; }
}
