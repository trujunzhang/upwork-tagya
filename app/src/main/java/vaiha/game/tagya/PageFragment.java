package vaiha.game.tagya;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;

import org.json.JSONException;
import org.json.JSONObject;

import vaiha.game.tagya.bridge.CommunicationBridge;
import vaiha.game.tagya.bridge.StyleBundle;
import vaiha.game.tagya.util.log.L;
import vaiha.game.tagya.views.ObservableWebView;

/**
 * Created by djzhang on 2/25/16.
 */
public class PageFragment extends Fragment implements BackPressedHandler {
    private CommunicationBridge bridge;
    //    private LinkHandler linkHandler;
    private TagyaApp app;
    private WebView webView;

    public WebView getWebView() {
        return webView;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        app = (TagyaApp) getActivity().getApplicationContext();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             final Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_page, container, false);

        webView = (WebView) rootView.findViewById(R.id.web_view);

        return rootView;
    }

    @Override
    public void onDestroy() {
        //uninitialize the bridge, so that no further JS events can have any effect.
        bridge.cleanup();
        super.onDestroy();
    }

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        // Explicitly set background color of the WebView (independently of CSS, because
        // the background may be shown momentarily while the WebView loads content,
        // creating a seizure-inducing effect, or at the very least, a migraine with aura).
        bridge = new CommunicationBridge(webView, "file:///android_asset/index.html");

        bridge.injectStyleBundle(StyleBundle.getAvailableBundle(StyleBundle.BUNDLE_PAGEVIEW));
    }

    @Override
    public boolean onBackPressed() {
        return true;
    }
}
