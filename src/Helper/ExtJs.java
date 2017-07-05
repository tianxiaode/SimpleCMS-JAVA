package Helper;

import net.sf.json.*;

public class ExtJs {
    public static JSONObject WriteObject(
    		boolean success,
    		JSONObject errors,
    		int total,
    		String msg,
    		JSONObject dataJsonObject,
    		JSONArray dataJsonArray
    		) {
		JSONObject jo = new JSONObject();
		jo.put("success", success);
		if(errors != null){
			jo.put("errors", errors);
		}
		if(total>0){
			jo.put("total",total);
		}
		if(msg != null){
			jo.put("msg", msg);			
		}
		if(dataJsonObject != null){
			jo.put("data", dataJsonObject);
		}
		if(dataJsonArray != null){
			jo.put("data", dataJsonArray);
		}		
		return jo;
		}
}
