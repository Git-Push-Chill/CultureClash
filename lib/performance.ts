/**
 * Performance monitoring utilities
 */

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
}

const metrics: PerformanceMetric[] = [];
const MAX_METRICS = 100;

/**
 * Measure the performance of a function
 */
export async function measurePerformance<T>(
  name: string,
  fn: () => Promise<T> | T
): Promise<T> {
  const startTime = performance.now();

  try {
    const result = await fn();
    const duration = performance.now() - startTime;

    recordMetric(name, duration);

    if (duration > 1000) {
      console.warn(
        `Performance warning: ${name} took ${duration.toFixed(2)}ms`
      );
    }

    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    recordMetric(`${name}-error`, duration);
    throw error;
  }
}

/**
 * Record a performance metric
 */
export function recordMetric(name: string, duration: number): void {
  metrics.push({
    name,
    duration,
    timestamp: Date.now(),
  });

  // Keep only recent metrics
  if (metrics.length > MAX_METRICS) {
    metrics.shift();
  }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`📊 ${name}: ${duration.toFixed(2)}ms`);
  }
}

/**
 * Get all recorded metrics
 */
export function getMetrics(): PerformanceMetric[] {
  return [...metrics];
}

/**
 * Get average duration for a specific metric
 */
export function getAverageDuration(name: string): number {
  const filtered = metrics.filter((m) => m.name === name);
  if (filtered.length === 0) return 0;

  const total = filtered.reduce((sum, m) => sum + m.duration, 0);
  return total / filtered.length;
}

/**
 * Get performance summary
 */
export function getPerformanceSummary(): Record<
  string,
  {
    count: number;
    average: number;
    min: number;
    max: number;
    total: number;
  }
> {
  const summary: Record<
    string,
    {
      count: number;
      average: number;
      min: number;
      max: number;
      total: number;
    }
  > = {};

  metrics.forEach((metric) => {
    if (!summary[metric.name]) {
      summary[metric.name] = {
        count: 0,
        average: 0,
        min: Infinity,
        max: -Infinity,
        total: 0,
      };
    }

    const s = summary[metric.name];
    s.count++;
    s.total += metric.duration;
    s.min = Math.min(s.min, metric.duration);
    s.max = Math.max(s.max, metric.duration);
  });

  // Calculate averages
  Object.values(summary).forEach((s) => {
    s.average = s.total / s.count;
  });

  return summary;
}

/**
 * Clear all metrics
 */
export function clearMetrics(): void {
  metrics.length = 0;
}

/**
 * Log performance summary to console
 */
export function logPerformanceSummary(): void {
  const summary = getPerformanceSummary();
  console.table(summary);
}

/**
 * Measure Web Vitals (Core Web Vitals)
 */
export function measureWebVitals(): void {
  if (typeof window === "undefined") return;

  // Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    recordMetric("LCP", lastEntry.startTime);
  });
  lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

  // First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      recordMetric("FID", entry.processingStart - entry.startTime);
    });
  });
  fidObserver.observe({ type: "first-input", buffered: true });

  // Cumulative Layout Shift (CLS)
  let clsScore = 0;
  const clsObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsScore += entry.value;
      }
    });
    recordMetric("CLS", clsScore);
  });
  clsObserver.observe({ type: "layout-shift", buffered: true });
}

// Auto-start web vitals measurement in browser
if (typeof window !== "undefined") {
  measureWebVitals();
}
