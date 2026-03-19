package vn.songan.huongnghiep;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;

import androidx.browser.customtabs.CustomTabColorSchemeParams;
import androidx.browser.trusted.TrustedWebActivityIntent;
import androidx.browser.trusted.TrustedWebActivityIntentBuilder;

import java.util.ArrayList;
import java.util.List;

public class LauncherActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    Uri launchUri = Uri.parse(BuildConfig.LAUNCH_URL);

    CustomTabColorSchemeParams colorScheme = new CustomTabColorSchemeParams.Builder()
      .setToolbarColor(getColor(R.color.brand_deep))
      .setNavigationBarColor(getColor(R.color.brand_deep))
      .build();

    TrustedWebActivityIntentBuilder builder = new TrustedWebActivityIntentBuilder(launchUri)
      .setToolbarColorSchemeParams(colorScheme);

    List<String> additionalOrigins = parseAdditionalOrigins(BuildConfig.ADDITIONAL_TRUSTED_ORIGINS);
    if (!additionalOrigins.isEmpty()) {
      builder.setAdditionalTrustedOrigins(additionalOrigins);
    }

    TrustedWebActivityIntent intent = builder.build(this);
    intent.launchTrustedWebActivity(this);
    finish();
  }

  private List<String> parseAdditionalOrigins(String rawValue) {
    List<String> origins = new ArrayList<>();
    if (rawValue == null || rawValue.trim().isEmpty()) {
      return origins;
    }

    for (String item : rawValue.split(",")) {
      String trimmed = item.trim();
      if (!trimmed.isEmpty()) {
        origins.add(trimmed);
      }
    }

    return origins;
  }
}
