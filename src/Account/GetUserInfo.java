package Account;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.org.apache.bcel.internal.generic.NEW;

import Helper.*;
import net.sf.json.*;
/**
 * Servlet implementation class GetUserInfo
 */
@WebServlet("/account/userinfo")
public class GetUserInfo extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetUserInfo() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		JSONObject userInfo = new JSONObject();
		userInfo.put("UserName", "admin");
		userInfo.put("Roles", "['系统管理员']");
		
		JSONObject jo = new JSONObject();
		jo.put("UserInfo", userInfo);
		jo.put("Menu", getMenu());
		JSONObject result = ExtJs.WriteObject(true, null, 0, null, jo, null);
		response.setContentType("text/javascript; charset=utf-8");
		response.getWriter().write(result.toString());
	}

	protected JSONArray getMenu() {
		JSONObject menu1 = new JSONObject();
		menu1.put("text", "文章管理");
		menu1.put("iconCls", "x-fa fa-file-text-o");
		menu1.put("rowCls", "nav-tree-badge");
		menu1.put("viewType", "articleView");
		menu1.put("routeId", "articleView");
		menu1.put("leaf", "true");

		JSONObject menu2 = new JSONObject();
		menu2.put("text", "媒体管理");
		menu2.put("iconCls", "x-fa fa-file-image-o");
		menu2.put("rowCls", "nav-tree-badge");
		menu2.put("viewType", "mediaView");
		menu2.put("routeId", "mediaView");
		menu2.put("leaf", "true");

		JSONObject menu3 = new JSONObject();
		menu3.put("text", "用户管理");
		menu3.put("iconCls", "x-fa fa-file-user");
		menu3.put("rowCls", "nav-tree-badge");
		menu3.put("viewType", "userView");
		menu2.put("routeId", "userView");
		menu3.put("leaf", "true");
		
		
		JSONArray jArray = new JSONArray();
		jArray.add(menu1);
		jArray.add(menu2);
		jArray.add(menu3);
		return jArray;
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
