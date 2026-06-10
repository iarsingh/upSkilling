package com.upskilling.dailyquest;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.SharedPreferences;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Random;

public class MainActivity extends Activity {
    private static final String PREFS = "daily_quest_prefs";
    private static final String[] DEFAULT_TASKS = {"Move for 10 minutes", "Drink water", "Plan tomorrow"};

    private SharedPreferences prefs;
    private LinearLayout taskList;
    private TextView streakText;
    private TextView progressText;
    private TapQuestView tapQuestView;
    private CountDownTimer timer;
    private int score;

    private final int paper = Color.rgb(248, 244, 234);
    private final int ink = Color.rgb(24, 32, 31);
    private final int forest = Color.rgb(29, 92, 84);
    private final int gold = Color.rgb(224, 168, 78);
    private final int rust = Color.rgb(170, 72, 51);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        prefs = getSharedPreferences(PREFS, MODE_PRIVATE);
        rollDayIfNeeded();
        setContentView(buildContent());
        refreshTasks();
    }

    @Override
    protected void onDestroy() {
        if (timer != null) {
            timer.cancel();
        }
        super.onDestroy();
    }

    private View buildContent() {
        ScrollView scrollView = new ScrollView(this);
        scrollView.setFillViewport(true);
        scrollView.setBackgroundColor(paper);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(20), dp(20), dp(20), dp(28));
        scrollView.addView(root, new ScrollView.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        ));

        TextView title = label("Daily Quest", 32, true);
        root.addView(title);

        TextView subtitle = label("Finish three small quests, build a streak, then play a quick tap round.", 16, false);
        subtitle.setPadding(0, dp(6), 0, dp(16));
        root.addView(subtitle);

        LinearLayout stats = new LinearLayout(this);
        stats.setOrientation(LinearLayout.HORIZONTAL);
        stats.setGravity(Gravity.CENTER);
        stats.setPadding(0, 0, 0, dp(14));
        root.addView(stats);

        streakText = statBox("0 day streak");
        progressText = statBox("0/3 done");
        stats.addView(streakText, new LinearLayout.LayoutParams(0, dp(74), 1));
        LinearLayout.LayoutParams progressParams = new LinearLayout.LayoutParams(0, dp(74), 1);
        progressParams.setMargins(dp(10), 0, 0, 0);
        stats.addView(progressText, progressParams);

        taskList = new LinearLayout(this);
        taskList.setOrientation(LinearLayout.VERTICAL);
        root.addView(taskList);

        TextView gameTitle = label("Tap Quest", 22, true);
        gameTitle.setPadding(0, dp(18), 0, dp(8));
        root.addView(gameTitle);

        tapQuestView = new TapQuestView(this);
        root.addView(tapQuestView, new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                dp(260)
        ));

        Button start = button("Start 20 second round", forest);
        start.setOnClickListener(v -> startTapQuest());
        LinearLayout.LayoutParams startParams = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                dp(52)
        );
        startParams.setMargins(0, dp(12), 0, 0);
        root.addView(start, startParams);

        Button reset = button("Reset today's quests", rust);
        reset.setOnClickListener(v -> {
            for (int i = 0; i < 3; i++) {
                prefs.edit().putBoolean(doneKey(i), false).apply();
            }
            refreshTasks();
        });
        LinearLayout.LayoutParams resetParams = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                dp(48)
        );
        resetParams.setMargins(0, dp(10), 0, 0);
        root.addView(reset, resetParams);

        return scrollView;
    }

    private void refreshTasks() {
        taskList.removeAllViews();
        int done = 0;
        for (int i = 0; i < 3; i++) {
            if (prefs.getBoolean(doneKey(i), false)) {
                done++;
            }
            taskList.addView(taskRow(i));
        }
        progressText.setText(done + "/3 done");
        streakText.setText(prefs.getInt("streak", 0) + " day streak");
        if (done == 3 && !prefs.getBoolean("streak_awarded_" + today(), false)) {
            String lastAwardedDay = prefs.getString("last_awarded_day", "");
            int streak = yesterday().equals(lastAwardedDay) ? prefs.getInt("streak", 0) + 1 : 1;
            prefs.edit()
                    .putInt("streak", streak)
                    .putBoolean("streak_awarded_" + today(), true)
                    .putString("last_awarded_day", today())
                    .apply();
            streakText.setText(streak + " day streak");
        }
    }

    private View taskRow(int index) {
        LinearLayout row = new LinearLayout(this);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_VERTICAL);
        row.setPadding(dp(14), dp(10), dp(12), dp(10));
        row.setBackgroundColor(Color.WHITE);

        TextView task = label(prefs.getString(taskKey(index), DEFAULT_TASKS[index]), 17, false);
        task.setGravity(Gravity.CENTER_VERTICAL);
        row.addView(task, new LinearLayout.LayoutParams(0, dp(54), 1));

        Button edit = button("Edit", gold);
        edit.setTextColor(ink);
        edit.setOnClickListener(v -> editTask(index));
        LinearLayout.LayoutParams editParams = new LinearLayout.LayoutParams(dp(78), dp(44));
        editParams.setMargins(dp(8), 0, 0, 0);
        row.addView(edit, editParams);

        boolean done = prefs.getBoolean(doneKey(index), false);
        Button toggle = button(done ? "Done" : "Todo", done ? forest : rust);
        toggle.setOnClickListener(v -> {
            prefs.edit().putBoolean(doneKey(index), !prefs.getBoolean(doneKey(index), false)).apply();
            refreshTasks();
        });
        LinearLayout.LayoutParams toggleParams = new LinearLayout.LayoutParams(dp(84), dp(44));
        toggleParams.setMargins(dp(8), 0, 0, 0);
        row.addView(toggle, toggleParams);

        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        );
        params.setMargins(0, 0, 0, dp(10));
        row.setLayoutParams(params);
        return row;
    }

    private void editTask(int index) {
        EditText input = new EditText(this);
        input.setSingleLine(false);
        input.setMinLines(1);
        input.setText(prefs.getString(taskKey(index), DEFAULT_TASKS[index]));
        input.setSelection(input.getText().length());
        new AlertDialog.Builder(this)
                .setTitle("Edit quest")
                .setView(input)
                .setPositiveButton("Save", (dialog, which) -> {
                    String value = input.getText().toString().trim();
                    if (!value.isEmpty()) {
                        prefs.edit().putString(taskKey(index), value).apply();
                        refreshTasks();
                    }
                })
                .setNegativeButton("Cancel", null)
                .show();
    }

    private void startTapQuest() {
        if (timer != null) {
            timer.cancel();
        }
        score = 0;
        tapQuestView.startRound();
        timer = new CountDownTimer(20_000, 250) {
            @Override
            public void onTick(long millisUntilFinished) {
                tapQuestView.setStatus("Score " + score + " | " + ((millisUntilFinished + 999) / 1000) + "s");
            }

            @Override
            public void onFinish() {
                int best = Math.max(score, prefs.getInt("best_score", 0));
                prefs.edit().putInt("best_score", best).apply();
                tapQuestView.endRound("Round over | Score " + score + " | Best " + best);
            }
        };
        timer.start();
    }

    private void rollDayIfNeeded() {
        String today = today();
        String savedDay = prefs.getString("saved_day", "");
        if (!today.equals(savedDay)) {
            SharedPreferences.Editor editor = prefs.edit().putString("saved_day", today);
            if (!yesterday().equals(prefs.getString("last_awarded_day", ""))) {
                editor.putInt("streak", 0);
            }
            for (int i = 0; i < 3; i++) {
                editor.putBoolean(doneKey(i), false);
            }
            editor.apply();
        }
    }

    private TextView label(String text, int sizeSp, boolean bold) {
        TextView view = new TextView(this);
        view.setText(text);
        view.setTextColor(ink);
        view.setTextSize(sizeSp);
        if (bold) {
            view.setTypeface(android.graphics.Typeface.DEFAULT_BOLD);
        }
        return view;
    }

    private TextView statBox(String text) {
        TextView view = label(text, 18, true);
        view.setGravity(Gravity.CENTER);
        view.setTextColor(Color.WHITE);
        view.setBackgroundColor(forest);
        return view;
    }

    private Button button(String text, int color) {
        Button button = new Button(this);
        button.setAllCaps(false);
        button.setText(text);
        button.setTextSize(15);
        button.setTextColor(Color.WHITE);
        button.setBackgroundColor(color);
        return button;
    }

    private String taskKey(int index) {
        return "task_" + index;
    }

    private String doneKey(int index) {
        return "done_" + today() + "_" + index;
    }

    private String today() {
        return new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(new Date());
    }

    private String yesterday() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, -1);
        return new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(calendar.getTime());
    }

    private int dp(int value) {
        return (int) (value * getResources().getDisplayMetrics().density + 0.5f);
    }

    private class TapQuestView extends View {
        private final Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
        private final Random random = new Random();
        private float targetX = 150;
        private float targetY = 150;
        private float radius = 42;
        private boolean running = false;
        private String status = "Tap start when you are ready";

        TapQuestView(Activity activity) {
            super(activity);
            setBackgroundColor(Color.WHITE);
            setMinimumHeight(dp(240));
        }

        void startRound() {
            running = true;
            moveTarget();
            setStatus("Score 0 | 20s");
        }

        void endRound(String text) {
            running = false;
            setStatus(text);
        }

        void setStatus(String text) {
            status = text;
            invalidate();
        }

        @Override
        protected void onDraw(Canvas canvas) {
            super.onDraw(canvas);
            paint.setStyle(Paint.Style.FILL);
            paint.setColor(Color.rgb(242, 237, 225));
            canvas.drawRect(new RectF(0, 0, getWidth(), getHeight()), paint);

            paint.setColor(ink);
            paint.setTextSize(dp(18));
            paint.setFakeBoldText(true);
            canvas.drawText(status, dp(16), dp(32), paint);
            paint.setFakeBoldText(false);

            if (running) {
                paint.setColor(gold);
                canvas.drawCircle(targetX, targetY, radius, paint);
                paint.setColor(forest);
                canvas.drawCircle(targetX, targetY, radius * 0.55f, paint);
                paint.setColor(Color.WHITE);
                canvas.drawCircle(targetX, targetY, radius * 0.22f, paint);
            } else {
                paint.setColor(forest);
                paint.setTextSize(dp(16));
                canvas.drawText("Best score: " + prefs.getInt("best_score", 0), dp(16), dp(62), paint);
            }
        }

        @Override
        public boolean onTouchEvent(MotionEvent event) {
            if (!running || event.getAction() != MotionEvent.ACTION_DOWN) {
                return true;
            }
            float dx = event.getX() - targetX;
            float dy = event.getY() - targetY;
            if ((dx * dx) + (dy * dy) <= radius * radius) {
                score++;
                radius = Math.max(dp(26), radius - 1.2f);
                moveTarget();
            }
            invalidate();
            return true;
        }

        private void moveTarget() {
            int width = Math.max(getWidth(), dp(260));
            int height = Math.max(getHeight(), dp(220));
            float minX = radius + dp(12);
            float maxX = width - radius - dp(12);
            float minY = radius + dp(52);
            float maxY = height - radius - dp(12);
            targetX = minX + random.nextFloat() * Math.max(1, maxX - minX);
            targetY = minY + random.nextFloat() * Math.max(1, maxY - minY);
        }
    }
}
