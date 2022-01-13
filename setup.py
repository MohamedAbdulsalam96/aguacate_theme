from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in aguacate_theme/__init__.py
from aguacate_theme import __version__ as version

setup(
	name="aguacate_theme",
	version=version,
	description="Theme for Agucate Apps and Cloud",
	author="Aguacate Codes",
	author_email="hello@aguacate.codes",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
