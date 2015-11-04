package WattWaste;

import java.sql.Time;

public class Timer {
	private boolean _active;
	private Time _on = new Time(0);
	private Time _off = new Time(0);
	
	public Timer() {
		_active = false;
	}
	
}
