from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='Test Team', description='A test team')
        self.assertEqual(str(team), 'Test Team')

    def test_create_user(self):
        user = User.objects.create(name='Test User', email='test@example.com', team='Test Team')
        self.assertEqual(str(user), 'Test User')

    def test_create_activity(self):
        activity = Activity.objects.create(user='test@example.com', activity='Running', duration=30)
        self.assertEqual(str(activity), 'test@example.com - Running')

    def test_create_leaderboard(self):
        lb = Leaderboard.objects.create(user='test@example.com', points=100)
        self.assertEqual(str(lb), 'test@example.com - 100')

    def test_create_workout(self):
        workout = Workout.objects.create(user='test@example.com', workout='Pushups', reps=50)
        self.assertEqual(str(workout), 'test@example.com - Pushups')
