package WattWaste;

import test.Timer;

public class Device {
	
	private String _name;
	private int _position;
	private float _current;
	private float _voltage;
	private Timer _timer = new Timer();
	
	public Device(String name, int position) {
		this._name = name;
		this._position = position;
	}
	
}
