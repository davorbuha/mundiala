package com.mundiala.app;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.util.AttributeSet;
import androidx.appcompat.widget.AppCompatImageView;

public class SplashScreen extends AppCompatImageView {

  public SplashScreen(Context context) {
    super(context);
  }

  public SplashScreen(Context context, AttributeSet attrs) {
    super(context, attrs);
  }

  public SplashScreen(Context context, AttributeSet attrs, int defStyle) {
    super(context, attrs, defStyle);
  }

  @Override
  protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    Drawable d = getDrawable();
    if (d != null) {
      int w = MeasureSpec.getSize(widthMeasureSpec);
      int h = w * d.getIntrinsicHeight() / d.getIntrinsicWidth();
      setMeasuredDimension(w, h);
    }
    else super.onMeasure(widthMeasureSpec, heightMeasureSpec);
  }
}
