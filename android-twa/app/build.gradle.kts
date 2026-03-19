val appId = "vn.songan.huongnghiep"
val appLabel = "Huong Nghiep Song An"
val launchHost = "your-public-domain.example"
val launchUrl = "https://your-public-domain.example/"
val additionalTrustedOrigins = ""

plugins {
  id("com.android.application")
}

android {
  namespace = appId
  compileSdk = 35

  defaultConfig {
    applicationId = appId
    minSdk = 24
    targetSdk = 35
    versionCode = 1
    versionName = "1.0.0"

    manifestPlaceholders["launchScheme"] = "https"
    manifestPlaceholders["launchHost"] = launchHost
    manifestPlaceholders["launcherLabel"] = appLabel

    buildConfigField("String", "LAUNCH_URL", "\"$launchUrl\"")
    buildConfigField("String", "WEB_HOST", "\"$launchHost\"")
    buildConfigField("String", "ADDITIONAL_TRUSTED_ORIGINS", "\"$additionalTrustedOrigins\"")
  }

  buildTypes {
    debug {
      applicationIdSuffix = ".debug"
      versionNameSuffix = "-debug"
    }

    release {
      isMinifyEnabled = false
      proguardFiles(
        getDefaultProguardFile("proguard-android-optimize.txt"),
        "proguard-rules.pro"
      )
    }
  }

  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }

  buildFeatures {
    buildConfig = true
  }
}

dependencies {
  implementation("androidx.browser:browser:1.9.0")
}
