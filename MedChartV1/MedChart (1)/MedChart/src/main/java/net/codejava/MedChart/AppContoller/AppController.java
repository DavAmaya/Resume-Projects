/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package net.codejava.MedChart.AppContoller;

import com.kwabenaberko.newsapilib.NewsApiClient;
import com.kwabenaberko.newsapilib.models.request.TopHeadlinesRequest;
import com.kwabenaberko.newsapilib.models.response.ArticleResponse;
import java.util.Arrays;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 *
 * @author amaya
 */
@Controller
public class AppController {
    @GetMapping("/Home")
    public ModelAndView HomePage() {
        return new ModelAndView("Home");
    }
    
    @GetMapping("/SignUp")
    public ModelAndView SignupPage() {
        return new ModelAndView("SignUp");
    }
    
    
    @GetMapping("/Login")
    public String LoginPage() {
        return "Login";
    }
    
  
    
     @GetMapping("/admin/Home") 
    public String home() {
        return "index";
    }
    
    @GetMapping("/admin/quote")
    public List<Object> getNews() throws JSONException {
        
        NewsApiClient newsApiClient = new NewsApiClient("26fcd79cfdd14681971663b9faa0cd9f");
        
        newsApiClient.getTopHeadlines(
                new TopHeadlinesRequest.Builder()
                        .q("bitcoin")
                        .language("en")
                        .build(),
                new NewsApiClient.ArticlesResponseCallback() {
                    @Override
                    public void onSuccess(ArticleResponse response) {
                        System.out.println(response.getArticles().get(0).getTitle());
                    }

                    @Override
                    public void onFailure(Throwable throwable) {
                       System.out.println(throwable.getMessage());
                    }
                }
        );
    
        
        String apiUrl = "https://newsapi.org/v2/top-headlines?q=health&country=us&category=health&apiKey=26fcd79cfdd14681971663b9faa0cd9f";
        RestTemplate restTemplate = new RestTemplate();
        Object[] HealthNews = restTemplate.getForObject(apiUrl, Object[].class);
        
        //Print the whole response to console.
        
        //Parse out the most important info from the response.
        JSONArray news = new JSONArray(HealthNews);
        System.out.println(news.toString());
        
        /*Iterator<Object> test = news.iterator();

        while (test.hasNext()){
            JSONObject jo = (JSONObject) test.next();
            
            
        String author = jo.getString("author");
        String title = jo.getString("title");
        String description = jo.getString("description");
        String url = jo.getString("url");
        String urlToImage = jo.getString("urlToImage");
        String publishedAt = jo.getString("publishedAt");
        String content = jo.getString("content");
        
            System.out.println(author+ "");
        }*/
    
        

        return Arrays.asList(HealthNews);
    }
    
    @GetMapping("/medStaff/Home") 
    public String medStaffhome() {
        return "medStaffHome";
    }
    
    
    @GetMapping("/Account_Settings")
    public ModelAndView Account_SettingsPage() {
        return new ModelAndView("Account_Settings");
    }
    
    
    @GetMapping("/Assistance")
    public ModelAndView AssistancePage() {
        return new ModelAndView("Assistance");
    }
    
    @GetMapping("/Check_In")
    public ModelAndView Check_InPage() {
        return new ModelAndView("Check_In");
    }
    
    @GetMapping("/Medical_Status")
    public ModelAndView Medical_StatusPage() {
        return new ModelAndView("Medical_Status");
    }
    
    @GetMapping("/Messages")
    public ModelAndView MessagesPage() {
        return new ModelAndView("Messages");
    }
    
    @GetMapping("/New_Message")
    public ModelAndView New_MessagePage() {
        return new ModelAndView("New_Message");
    }
    
    @GetMapping("/Room_Management")
    public ModelAndView Room_ManagementPage() {
        return new ModelAndView("Room_Management");
    }
    
    @GetMapping("/Test_Results")
    public ModelAndView Test_ResultsPage() {
        return new ModelAndView("Test_Results");
    }
   
    
}
