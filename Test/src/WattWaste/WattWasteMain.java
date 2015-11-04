package WattWaste;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.websocket.server.WebSocketHandler;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

public class WattWasteMain {
	
	private static int _port = 4444;

    public static void main(String[] args) throws Exception {
        Server server = new Server(_port);
        WebSocketHandler wsHandler = new WebSocketHandler() {
            @Override
            public void configure(WebSocketServletFactory factory) {
                factory.register(ClientConnectionHandler.class);
            }
        };
        server.setHandler(wsHandler);
        server.start();
        server.join();
    }
}