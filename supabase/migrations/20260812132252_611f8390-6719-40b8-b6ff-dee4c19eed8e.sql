CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 45,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX bookings_slot_unique ON public.bookings (starts_at) WHERE status <> 'cancelada';
CREATE INDEX bookings_starts_at_idx ON public.bookings (starts_at);

GRANT INSERT ON public.bookings TO anon, authenticated;
GRANT ALL ON public.bookings TO service_role;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request a booking"
  ON public.bookings FOR INSERT TO anon, authenticated
  WITH CHECK (
    starts_at > now()
    AND starts_at < now() + INTERVAL '90 days'
    AND duration_minutes BETWEEN 15 AND 180
    AND length(customer_name) BETWEEN 2 AND 80
    AND length(customer_phone) BETWEEN 6 AND 24
    AND length(service) BETWEEN 2 AND 60
    AND status = 'pendente'
  );

CREATE OR REPLACE FUNCTION public.get_taken_slots(day DATE)
RETURNS TABLE (starts_at TIMESTAMPTZ, duration_minutes INTEGER)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.starts_at, b.duration_minutes
  FROM public.bookings b
  WHERE b.status <> 'cancelada'
    AND b.starts_at >= day::timestamptz
    AND b.starts_at < (day + 1)::timestamptz;
$$;

GRANT EXECUTE ON FUNCTION public.get_taken_slots(DATE) TO anon, authenticated, service_role;