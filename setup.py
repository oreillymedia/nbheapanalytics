import setuptools

setuptools.setup(
    name="nbheapanalytics",
    version='0.1.0',
    url="https://github.com/oreillymedia/nbheapanalytics",
    author="O'Reilly Media",
    description="Simple Jupyter extension to track usage via Heap",
    packages=setuptools.find_packages(),
    install_requires=[
        'notebook',
    ],
    package_data={'nbheapanalytics': ['static/*']},
)
